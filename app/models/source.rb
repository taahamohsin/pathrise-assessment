class Source < ApplicationRecord
  has_many :opportunities

  class << self
    def find_all(params={})
      Source.where(**params)
    end

    def retrieve_by_id(id)
      Source.find(id)
    end
  end
end
