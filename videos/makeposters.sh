rm -rf poster
mkdir poster
for video in mp4/*.mp4; do
	f=${video##mp4/}
	f=${f%%.mp4}
	ffmpeg -i ${video} -vframes 1 -f image2 poster/${f}.jpg
done