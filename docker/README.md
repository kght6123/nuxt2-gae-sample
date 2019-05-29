# Docker環境

MySQLのローカル環境に使う

## パーティション化について

 - パーティション追加・削除はHASHよりLINEAR HASHが速い。SELECT・INSERTは変わらない
 - KEY, LINEAR KEYはパーティション毎に件数にばらつきがでる（パーティションテーブルの件数の予測が不可）
   - パーティショニングにはLINEAR HASHを使う

### パーティションテーブル内の件数のばらつきを確認

LINEAR HASHでばらつきが無いか、1677万件のデータを入れて確認する

 - `docker/mysql/initdb.d/testdata.sql`の実行にとても時間がかかる。

```sh
$ mysql --host localhost --port 3306 -u root -p
mysql> SELECT partition_method, partition_name, table_rows
    -> FROM information_schema.partitions WHERE table_name = 'users';
+------------------+----------------+------------+
| partition_method | partition_name | table_rows |
+------------------+----------------+------------+
| NULL             | NULL           |        128 |
| LINEAR HASH      | p0             |     197781 |
| LINEAR HASH      | p1             |     257305 |
| LINEAR HASH      | p2             |     257305 |
| LINEAR HASH      | p3             |     157484 |
| LINEAR HASH      | p4             |     159340 |
| LINEAR HASH      | p5             |     199643 |
| LINEAR HASH      | p6             |     156555 |
| LINEAR HASH      | p7             |     161824 |
| LINEAR HASH      | p8             |     164303 |
| LINEAR HASH      | p9             |     164953 |
| LINEAR HASH      | p10            |     200263 |
| LINEAR HASH      | p11            |     198261 |
| LINEAR HASH      | p12            |     203363 |
| LINEAR HASH      | p13            |     169265 |
| LINEAR HASH      | p14            |     167432 |
| LINEAR HASH      | p15            |     174842 |
| LINEAR HASH      | p16            |     177323 |
| LINEAR HASH      | p17            |     177944 |
| LINEAR HASH      | p18            |     179800 |
| LINEAR HASH      | p19            |     179804 |
| LINEAR HASH      | p20            |     182904 |
| LINEAR HASH      | p21            |     208944 |
| LINEAR HASH      | p22            |     208944 |
| LINEAR HASH      | p23            |     211425 |
| LINEAR HASH      | p24            |     215764 |
| LINEAR HASH      | p25            |     218863 |
| LINEAR HASH      | p26            |     219486 |
| LINEAR HASH      | p27            |     257305 |
| LINEAR HASH      | p28            |     220103 |
| LINEAR HASH      | p29            |     221963 |
| LINEAR HASH      | p30            |     221963 |
| LINEAR HASH      | p31            |     225063 |
| LINEAR HASH      | p32            |     226302 |
| LINEAR HASH      | p33            |     231885 |
| LINEAR HASH      | p34            |     231886 |
| LINEAR HASH      | p35            |     232503 |
| LINEAR HASH      | p36            |     234984 |
| LINEAR HASH      | p37            |     239324 |
| LINEAR HASH      | p38            |     243041 |
| LINEAR HASH      | p39            |     243664 |
| LINEAR HASH      | p40            |     244285 |
| LINEAR HASH      | p41            |     246763 |
| LINEAR HASH      | p42            |     246788 |
| LINEAR HASH      | p43            |     249241 |
| LINEAR HASH      | p44            |     257924 |
| LINEAR HASH      | p45            |     260408 |
| LINEAR HASH      | p46            |     261024 |
| LINEAR HASH      | p47            |     137022 |
| LINEAR HASH      | p48            |     139503 |
| LINEAR HASH      | p49            |     141363 |
| LINEAR HASH      | p50            |     143225 |
| LINEAR HASH      | p51            |     144467 |
| LINEAR HASH      | p52            |     145704 |
| LINEAR HASH      | p53            |     148187 |
| LINEAR HASH      | p54            |     145073 |
| LINEAR HASH      | p55            |     152526 |
| LINEAR HASH      | p56            |     151118 |
| LINEAR HASH      | p57            |     249865 |
| LINEAR HASH      | p58            |     251107 |
| LINEAR HASH      | p59            |     182927 |
| LINEAR HASH      | p60            |     188484 |
| LINEAR HASH      | p61            |     190345 |
| LINEAR HASH      | p62            |     194065 |
| LINEAR HASH      | p63            |     196546 |
+------------------+----------------+------------+
65 rows in set (0.03 sec)

mysql> SELECT count(*) FROM sample_db.users;
+----------+
| count(*) |
+----------+
| 16777216 |
+----------+
1 row in set (16.33 sec)

```

LINEAR HASHでも、かなりばらつく。

１テーブルの件数に余裕を見て、テーブルの分割数を決める。


## コマンド

```sh
# Dockerコンテナの破棄・生成
docker-compose up -d
docker-compose down

# MySQLにログイン
mysql --host 127.0.0.1 --port 3306 -u docker -p 

# MySQLのDatabaseデータを初期化
rm -R docker/mysql/data/*
```

## Tips

VSCodeにDocker拡張を入れると、VSCodeのDockerメニューから、各々のコンテナにShellで接続したり、ログをみたりできるので、便利

http://localhost:18080/

## 参考資料

### テーブル分割

MySQL パーティショニングで高速化
https://moneyforward.com/engineers_blog/2015/09/16/mysql-partitioning/

MySQLでパーティショニングを使用した時の、データの配置状態を確認する
https://kazuhira-r.hatenablog.com/entry/20170226/1488109570

今更ながら MySQL の HASH / KEY パーティショニングについて調べてみた。
https://techlog.voyagegroup.com/entry/2015/06/17/132151

### Cloud SQL for MySQLの設定を変える（絵文字対応を参考に）

データベース フラグを構成する
https://cloud.google.com/sql/docs/mysql/flags

Enable Emojis in MySQL on Google Cloud
https://medium.com/google-cloud/enable-full-unicode-in-mysql-on-google-cloud-aaa2635486d6

