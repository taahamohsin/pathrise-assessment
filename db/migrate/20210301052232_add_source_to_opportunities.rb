class AddSourceToOpportunities < ActiveRecord::Migration[5.2]
  def change
    add_reference :opportunities, :source, foreign_key: true
  end
end
