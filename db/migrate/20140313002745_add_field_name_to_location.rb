class AddFieldNameToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :nb_bikes, :integer
    add_column :locations, :nb_empty_docks, :integer
  end
end
