class RewardsController < ApplicationController
    wrap_parameters format:[]
    skip_before_action :authorized, only: [:index, :show]
    

    def index
        rewards = Reward.all
        render json: rewards, status: :ok
    end

    def show
        reward = find_reward
        render json: reward, status: :ok
    end

    def create
        rewards = Reward.all
        reward = rewards.create!(reward_params)
        render json: reward, status: :created
    end

    def update
        reward = find_reward
        reward.update!(reward_params)
        render json: reward, status: :accepted
    end

    def destroy
        reward = find_reward
        reward.destroy
        head :no_content
    end

    def buy_reward
        reward = Reward.find_by(id: params[:id])
        student = @current_user
        reward.update!(reward_params)
        price = reward.price
        student.wallet -= price
        student.update!(transaction_params)
        render json: reward, status: :accepted
    end
   
    private

    def find_reward
        Reward.find_by(id: params[:id])
    end

    def reward_params
        params.permit(:id, :title, :description, :image, :price, :pickup_place, :available, :user_id, :reward_condition, :reward_category, :buyer, :collected)
    end

    def transaction_params
        params.permit(:wallet)
    end


end
