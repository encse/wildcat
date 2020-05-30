rm -rf poster
mkdir poster
for video in mp4_scaled/*.mp4; do
	f=${video##mp4_scaled/}
	f=${f%%.mp4}
	ffmpeg -i ${video} -vframes 1 -f image2 poster/${f}.jpg
done