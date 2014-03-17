class Location < ActiveRecord::Base

	validates :name, presence: true, uniqueness: true
	validates :longitude, uniqueness: true
	validates :latitude, uniqueness: true



	#instead of letting users enter the long and lat themselves we'll have Geocoder do that by the address

	geocoded_by :name
	after_validation :geocode # this is not needed because i've already gotten the long and lat from the scrape





end
