class OpportunitySerializer < ActiveModel::Serializer
  attributes :id, :job_title, :company_name, :job_url, :job_source
end