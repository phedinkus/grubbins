# Load the Rails application.
require File.expand_path('../application', __FILE__)

YAML.load_file("#{::Rails.root}/config/twitter.yml")[::Rails.env].each {|k,v| ENV[k] = v }

# Initialize the Rails application.
Grubbins::Application.initialize!
