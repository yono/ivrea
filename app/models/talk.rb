class Talk < ApplicationRecord
  validates :note, presence: true
  belongs_to :channel
end
