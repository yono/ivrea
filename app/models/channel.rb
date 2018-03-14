class Channel < ApplicationRecord
  has_many :talks
  validates :name, uniqueness: true, presence: true
end
