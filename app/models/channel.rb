class Channel < ApplicationRecord
  has_many :talks, dependent: :destroy
  validates :name, uniqueness: true, presence: true
end
