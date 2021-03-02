class OpportunitiesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    sanitized_params = opportunities_create_params
    opportunities = Opportunity.parse_file(params[:file])

    render json: opportunities
  end

  private
  def opportunities_create_params
    params.require(:file)
    params.permit(:file).to_h.symbolize_keys
  end
end