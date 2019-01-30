cd ../client
ng build --prod --outputPath=../server/dist
cd ../server
gcloud app deploy --project development-228021
