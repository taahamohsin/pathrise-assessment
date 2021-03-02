class CreateSources < ActiveRecord::Migration[5.2]
  def change
    create_table :sources do |t|
      t.string :name, null: false
      t.string :rating, null: false
      t.string :root_domain
      t.string :logo_file
      t.text :description

      t.timestamps
    end
  end
end
