# Serverless Nest Microservice Template

This is a template for creating a serverless microservice using Nest.js on AWS Lambda.

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js (v14 or higher)
- Serverless Framework (global installation)

## Setup

Follow these steps to set up and deploy the microservice:

1. Clone this repository: `git clone https://github.com/ekrenz-developer/serverless-nest-microservice-template.git`
2. Navigate to the repository directory: `cd serverless-nest-microservice-template`
3. Install the dependencies: `npm install`
4. Configure your AWS credentials:
   - Create a `credentials` file in the `~/.aws/` directory (if it doesn't exist) and add your AWS credentials:

[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
region = YOUR_REGION

5. Deploy the microservice to AWS Lambda: serverless deploy

## Project Structure

The project follows the standard structure of a Nest.js application. Here's a description of key directories:

- `src`: Contains the source code of the application.
- `src/{module}/handlers`: Defines the server's endpoint handlers.
- `src/{module}/services`: Defines the handlers' services.
- `src/common`: Contains common files and utilities.
- `serverless.yml`: Serverless Framework deployment configuration file.

## Contributing

If you'd like to contribute to this project, follow these steps:

1. Create a fork of the repository.
2. Create a branch for your feature: `git checkout -b your-feature-branch`.
3. Make the changes and commit: `git commit -m 'Description of the changes'`.
4. Push the changes to your forked repository: `git push origin your-feature-branch`.
5. Open a pull request in the original repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
