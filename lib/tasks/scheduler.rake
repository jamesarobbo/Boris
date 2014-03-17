namespace :boris do

task get_rid: :environment do
	Location.delete_all
end

task scrape_borisAPI: :environment do

	@json = HTTParty.get("http://borisapi.heroku.com/stations.json")

	@json.each do |station|

		@location = Location.new
		@location.name = station["name"]
		@location.latitude = station["lat"]
		@location.longitude = station["long"]
		@location.nb_bikes = station["nb_bikes"]
		@location.nb_empty_docks = station["nb_empty_docks"]
		@location.save
	end
end

task :all => [:get_rid, :scrape_borisAPI]

end
