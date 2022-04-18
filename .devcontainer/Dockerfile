# The below image is created out of the Dockerfile.base
# It has the dependencies already installed so that codespace will boot up fast
FROM ghcr.io/cyberchat/cyberchat_codespace:latest

# Do the set up required for cyberchat app
WORKDIR /workspace
COPY . /workspace
RUN yarn && gem install bundler && bundle install
