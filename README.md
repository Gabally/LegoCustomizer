# Lego Customizer
### An app to receiver orders for customized lego pieces.

<p style="margin-top: 30px" align="center">
<img width="160" src="frontend/public/favicon.ico">
</p>


## Development (api and frotend):
```bash
npm run dev
```

## Build for production (api and frotend):
```bash
npm run build
```

## Run api in docker
```bash
docker run --name lego-customizer --env-file ./.env -v $(pwd)/datadir:/datadir  -d -p 5000:5000 <image-name>
```
