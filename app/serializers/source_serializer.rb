class SourceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :root_domain, :logo_file
  has_many :opportunities
end