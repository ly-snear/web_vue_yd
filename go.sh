#!/bin/sh
cp -rf static/* dist/static/
tar cvf dist-yidian.tar.gz dist/
scp dist-yidian.tar.gz root@39.105.198.102:~

rm -rf dist

# tar jcvf heyui-admin-yidian.tar.bz2  --exclude="node_modules/*" heyui-admin-yidian
