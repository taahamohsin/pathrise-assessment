require 'smarter_csv'
require 'parallel'

class Opportunity < ApplicationRecord

  class << self
    def parse_file(file)
      sources = Source.find_all
      chunks = SmarterCSV.process(file.path, chunk_size: 1000)
      data = Parallel.map(chunks) do |chunk|
        worker(chunk, sources)
      end
      data.flatten
    end

    private
    def worker(chunk, sources)
      chunk.map do |row|
        source = infer_source(row[:job_url], row[:company_name], sources)
        begin
          opportunity = Opportunity.new(
            id: row[:"id_(primary_key)"],
            job_title: row[:job_title],
            company_name: row[:company_name],
            job_url: row[:job_url],
            job_source: source,
            source_id: Source.find_by(name: source)&.id
          )
          opportunity.save!
          opportunity
        rescue StandardError
          next
        end
      end
    end

    def infer_source(source_url, company_name, sources)
      unless source_url.blank?
        begin
          uri = URI.parse(source_url)
          if uri.host
            job_board = sources.find do |source|
              uri&.host.gsub("www.", "").include?(source.root_domain)
            end

            return job_board.name unless job_board.nil?

            stripped_company_name = company_name.downcase.gsub(/\s+/, "")
            is_company_website = uri&.host.include?(stripped_company_name) || uri&.path&.include?(stripped_company_name)

            return 'Company Website' if is_company_website
          end
        rescue URI::InvalidURIError
          # continue to return unknown
        end
      end
      return 'Unknown'
    end
  end
end