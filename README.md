# 健康促進アプリ「へるぴぃ」
![image](/room/発表.png)

### JPHACKS 2024参加作品です！
[JPHACKSのときのリポジトリ](https://github.com/jphacks/os_2410)
## デモ動画
[![へるぴぃ](video/サムネイル.png)](https://youtube.com/shorts/_yqUTSn6jV0?feature=share
)

## 概要
- ユーザーの生活習慣の健康度、不健康度をキャラクターの寿命やHPという形で可視化することで、ユーザーに健康的な生活を送るように促すアプリです。
### 背景
開発のきっかけは今回のチームメンバーの一人がよく徹夜や、数日間食事を抜くなどの不健康な生活をしていて、それをなんとかしたいと考えたのがきっかけです。

実際に不健康な生活をしている方は特に学生に多く、その人達は今後の自分への影響を考えず、そのまま生活を習慣化し、健康を害してしまう可能性があります。

そのため、このアプリを使うことで、不健康な生活を続けることで健康を害してしまうことに対して危機感を持ち、また、生活への意欲をもってもらうことを目指すアプリを作成しました。
## 説明
### 特長
#### 1. 特長1
- ユーザーは自らの生活習慣を記録することができ、それに基づき画面上のキャラクターが同じ行動を行います。それらの行動はキャラクターの寿命やHPに影響を与え、ユーザーにはその行動が短期的、長期的にどのような影響を与えるかを可視化することができます。
#### 2. 特長2
- 健康を促進するアプリは入力に時間がかかることが多く、飽きたりなどで続かないことがあります。そのため、へるぴぃは直感的かつストレスのないUIを目指し、行動の記録を簡単に行うことができます。
#### 3. 特長3
- メンバーがデザインした愛らしいキャラクターが画面上で生活をしています。ユーザーの行動による影響の可視化は実際にHPといった形で定量的に表される以外にも、キャラクターの様子にも反映されます。それにより、よりユーザーは自らの行動に対しての危機感を持つことができ、また、生活への意欲を持つことができます。
![image](/character/状態変化.png)

- また日数とともに成長を行うので、ユーザーはキャラクターの成長を楽しみながら生活を改善することができます。
![image](/character/成長状態.png)


### 解決出来ること
- ユーザーが自分の生活に危機感を持ち、ともにキャラクターと成長したいと思うことで、健康的な生活を送るように促すことができます。それにより、不健康な生活をする人が減り、健康な生活を送る人が増えます。

### 今後の展望
- キャラクター関連
    - 行動に対してのキャラクターのフィードバックの種類を増やす
        - 健康的な行動に対してキャラクタ-が喜ぶ、悪い行動に対してキャラクターが悲しむなどのフィードバック
        - キャラクターが考えていることがわかる！といった形でユーザーに生活の改善点を提案する
    - ユーザーの飽きを防止するためキャラクターのの種類を増やす。
    - キャラクターにアニメーションを追加
 
- 現状の行動入力がユーザーのストレス負荷を減らすために、簡易的なものにしているが、今後の改善の提案などを考えたときの為に詳細入力機能を追加する。また詳細入力機能を使用した際は、キャラクターの反応が変わるなどの工夫を行う。


- 行動入力に関して、決められているものとは別に自由入力を追加し、LLMを活用することでユーザーの行動のキャラクターへの影響を可視化や、キャラクターによるフィードバック(心配する様子を見せるなど)を行う。


- キャラクター死亡時の振り返り機能の充実
    - キャラクターが死亡した際に、ユーザーのどの行動が寿命やHPに影響を与えたのかをグラフと表形式で表示することで、ユーザーに自らの行動の反省を促す。
 

- 現在の行動によるキャラクターの寿命やHPの変化量を、実際に使っていただきフィードバックをいただくことで難易度の調整を行う。(現状は[こちら](https://rowan-cosmos-e5c.notion.site/12c617ce8eef80fcb9f7cb215fac2d22))


### 注力したこと（こだわり等）
* ユーザーに愛着や危機感を持ってもらうために、キャラクターのデザインに力を入れました。
* あつかいやすいUIを目指し、ユーザーが続けやすいようにしました。


## 開発技術
### 活用した技術
#### フレームワーク・ライブラリ・モジュール
* Ruby on Rails
* React
* TypeScript
* Tailwind CSS
* Vite
* Docker
* PostgreSQL

## 発表資料
https://www.canva.com/design/DAGUu4zRLto/WChvQazXd7S9Au8VwJBelw/edit?utm_content=DAGUu4zRLto&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
## 最後に
Hallo, World!は去年も神戸会場で参加したチームです。<br>
去年は技術力が足りず、開発が全く終わらなく悔しい思いをしたのですが、今年は技術力を向上させてきた他、仲間を増やし最高の5人チームを結成し、そしてワクワクするアイデアを持ってきました。

リベンジということで頑張りました！
よろしくお願いします！🐙



