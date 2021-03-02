class CreateOpportunities < ActiveRecord::Migration[5.2]
  def change
    create_table :opportunities, { id: false } do |t|
      t.string :id, null: false
      t.string :job_title
      t.string :company_name
      t.text :job_url
      t.string :job_source

      t.timestamps
    end
  end
end
