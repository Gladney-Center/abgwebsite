# Project
set :application, "gladney"

# Local
set :local_db_host, "localhost"
set :local_db_name,  "#{fetch(:application)}"
set :local_db_user, "root"
set :local_db_password, "goodwork"
set :local_uploads_path, "public/uploads/"

# Staging
set :staging_ip, "harry"
set :staging_username, "serverpilot"
set :staging_path, "/srv/users/serverpilot/apps/#{fetch(:application)}"
set :staging_db_host, "localhost"
set :staging_db_name,  "#{fetch(:application)}"
set :staging_db_user, "root"
set :staging_db_password, "cbf6cd5ac1d2b2f923d9a4fa879cad35"
set :staging_uploads_path, "public/uploads/"

# Production
set :production_ip, "45.55.185.106"
set :production_username, "master_bayyzuxqpn" # Server username
set :production_path, "applications/ggfxbebmfg/public_html" # Application name
set :production_db_host, "localhost"
set :production_db_name,  "ggfxbebmfg" # Application DB name
set :production_db_user, "ggfxbebmfg" # Application DB user
set :production_db_password, "B5Z84Wmn2r" # Application DB password
set :production_uploads_path, "public/uploads/"


set :deploy_config_path, '../gw-cap/cap/deploy.rb'
set :stage_config_path, '../gw-cap/cap/deploy'
require 'capistrano/setup'
Dir.glob('../gw-cap/cap/tasks/*.rb').each { |r| import r }
