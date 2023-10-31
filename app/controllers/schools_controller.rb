class SchoolsController < ApplicationController
    skip_before_action :authorized

    def index
        schools = School.all
        render json: schools, status: :ok
    end

    def schools_by_name
        schools = School.all
        school_names = schools.map {|s| s.name}.uniq
        render json: school_names, status: :ok
    end

    private

    def render_not_found_response
        render json: "Category not found.", status: :not_found 
    end

end
