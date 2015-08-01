task scrape_borisAPI: :environment do

	@page = HTTParty.get("https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml")
  @doc = Nokogiri::XML(@page.body)

	@doc.css('station').each do |station|

    @location = Location.find_by_name(station.css('name').text)

    if @location.nil?
      @location = Location.new
      @location.name = station.css('name').text
      @location.latitude = station.css('lat').text
      @location.longitude = station.css('long').text
      @location.nb_bikes = station.css('nbBikes').text
      @location.nb_empty_docks = station.css('nbEmptyDocks').text
      @location.save
    else
      @location.update(
        name: station.css('name').text,
        latitude: station.css('lat').text,
        longitude: station.css('long').text,
        nb_bikes: station.css('nbBikes').text,
        nb_empty_docks: station.css('nbEmptyDocks').text

      )
    end

	end

end
