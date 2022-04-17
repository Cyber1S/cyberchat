release: bundle exec rails db:cyber1schat_prepare
web: bin/rails server -p $PORT -e $RAILS_ENV
worker: bundle exec sidekiq -C config/sidekiq.yml
