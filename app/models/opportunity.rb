require 'csv'

class Opportunity < ApplicationRecord

  class << self
    def parse_file(file)
      data = []
      sources = Source.find_all
      CSV.foreach(file.path, headers: true) do |row|
        source = infer_source(row['Job URL'], row['Company Name'], sources)
        byebug
        data << Opportunity.create!(
          id: row['ID (primary key)'],
          job_title: row['Job Title'],
          company_name: row['Company Name'],
          job_url: row['Job URL'],
          job_source: source,
          source_id: Source.find_by(name: source).id || nil
        )
      end
      data
    end

    private
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

            return company_name if is_company_website
          end
        rescue URI::InvalidURIError
          # continue to return unknown
        end
      end
      return 'Unknown'
    end
  end
end