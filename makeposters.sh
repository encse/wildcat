rm -rf site/videos/poster
mkdir site/videos/poster
for video in site/videos/mp4/*.mp4; do
	f=${video##*mp4/}
	f=${f%%.mp4}
	ffmpeg -i ${video} -vframes 1 -f image2 site/videos/poster/${f}.jpg
done