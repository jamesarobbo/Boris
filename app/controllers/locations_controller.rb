class LocationsController < ApplicationController

	def index 

		# if we have a search query find bikes near that search query, otherwise show all pubs

		# @locations = Location.all

		if params[:search].present?

			# find bikes near the search query
			@locations = Location.near(params[:search]).limit(15)
			

		else
			@locations = Location.order("nb_bikes desc").limit(25)
		end	

	end




end