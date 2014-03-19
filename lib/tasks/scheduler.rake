task scrape_borisAPI: :environment do

	@json = HTTParty.get("http://borisapi.heroku.com/stations.json")

	@json.each do |station|

    @location = Location.find_by_name(station["name"])

    if @location.nil?
      @location = Location.new
      @location.name = station["name"]
      @location.latitude = station["lat"]
      @location.longitude = station["long"]
      @location.nb_bikes = station["nb_bikes"]
      @location.nb_empty_docks = station["nb_empty_docks"]
      @location.save
    else
      @location.update(
        name: station["name"],
        latitude: station["lat"],
        longitude: station["long"],
        nb_bikes: station["nb_bikes"],
        nb_empty_docks: station["nb_empty_docks"]

      )
    end

	end


end
