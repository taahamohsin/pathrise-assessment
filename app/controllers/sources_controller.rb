class SourcesController < ApplicationController
  skip_before_action :verify_authenticity_token, except: [:index]

  def index
    sanitized_params = sources_index_params
    sources = Source.find_all(sanitized_params)

    render json: sources
  end

  def show
    source = Source.retrieve_by_id(params[:id])

    render json: source, serializer: SourceSerializer
  end

  private

  def sources_index_params
    params.permit(:name, :rating).to_h.symbolize_keys
  end
end
