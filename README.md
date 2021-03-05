# Job Source Tracker

## Installation

I recommend using [nvm](https://github.com/nvm-sh/nvm) and [rvm](https://rvm.io/) to ensure you're using the correct versions of node and ruby, respectively. Once you've got those set up, please run `nvm use` and `rvm use` from the project root. Then run `yarn install` or just `yarn`, and `bundle install` or just `bundle` to install the project's dependencies.

## Running the project

To run the rails server locally, please run `bundle exec rails s` from the project root. Similarly, to run the webpack server for the frontend, run `./bin/webpack-dev-server`

Please note: you may need to change the DB password in `database.yml` if your root password is different from what is specified in the file. This is not set up with secure deployment in mind at the moment and is just a demo.

## Use of third-party libraries

This project primarily uses React with Ant Design for styling because of the declarative and compositional nature of React making UI development streamlined. Similarly, I chose Ruby on Rails for the backend for the combination of development experience and community support.

## Current results

The results based off the provided data are summarized below. The detailed resolution data can be found in `app/assets/job_source_aggregated_data.csv`.

| Source | Count |
| --- | ----------- |
| Lever |  2671 |
| LinkedIn |  6568 |
| Google |  160 |
| Greenhouse | 3039 |
|Jobvite | 382 |
| ZipRecruiter | 64 |
| AngelList | 120 |
| Glassdoor | 295 |
| SmartRecruiters | 69 |
| Indeed | 891 |
| Triplebyte | 13 |
| Tech Ladies | 2 |
| Hired | 27 |
| Monster | 4 |
| Work At A Startup | 4 |
| Stackoverflow | 2 |
| Government Jobs | 1 |
| Company Website | 2093 |
| Unknown |  3595 |
