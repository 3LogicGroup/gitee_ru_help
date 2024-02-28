FROM ruby:2.7.6-alpine3.16
MAINTAINER atompi <coder.atompi@gmail.com>
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add --no-cache gcc g++ make sqlite-dev \
    && gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/ \
    && gem install mailcatcher
EXPOSE 1025 1080
ENTRYPOINT ["mailcatcher", "--foreground"]
CMD ["--ip", "0.0.0.0"]
