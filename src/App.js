import React, {useState} from 'react';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function withPrettyDate(DateTime) {
  return function(props) {
    let now = new Date();
    let difference = new Date(now - new Date(props.date));
    let prettyDate;
    console.log(difference);
    let days = Math.floor(((difference.getYear() - 70) * 365.2425) + difference.getDate() - 1);
    if (days == 0) {
      let hours = difference.getUTCHours();
      if (hours == 0) {
        let minutes = difference.getUTCMinutes();
        if (minutes == 0) {
          let seconds = difference.getSeconds();
          if (seconds == 0) {
            prettyDate = 'только что';
          } else {
            let secondsFirstDigit = hours % 10;
            let secondWord = secondsFirstDigit == 1 ? 'секунду' : secondsFirstDigit < 5 ? 'секунды' : 'секунд';
            prettyDate = seconds + ' ' + secondWord + ' назад';
          }
        } else {
          let minutesFirstDigit = hours % 10;
          let minuteWord = minutesFirstDigit == 1 ? 'минуту' : minutesFirstDigit < 5 ? 'минуты' : 'минут';
          prettyDate = minutes + ' ' + minuteWord + ' назад';
        }
      } else {
        let hoursFirstDigit = hours % 10;
        let hourWord = hoursFirstDigit == 1 ? 'час' : hoursFirstDigit < 5 ? 'часа' : 'часов';
        prettyDate = hours + ' ' + hourWord + ' назад';
      }
    } else {
      let daysFirstDigit = days % 10;
      let dayWord = daysFirstDigit == 1 ? 'день' : daysFirstDigit < 5 ? 'дня' : 'дней';
      prettyDate = days + ' ' + dayWord + ' назад';
    }
    
    return (<DateTime date={prettyDate}/>);
  }
}

function Video(props) {
  const DateTimePretty = withPrettyDate(DateTime);
  return (
    <div className="video">
      <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      <DateTime date={props.date} />
      <DateTimePretty date={props.date} />
    </div>
  )
}

function VideoList(props) {
  return props.list.map(item => <Video url={item.url} date={item.date} />);
};

export default function App() {
  const [list, setList] = useState([
    {
        url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2017-07-31 13:24:00'
    },
    {
        url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-03-03 12:10:00'
    },
    {
        url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-02-03 23:16:00'
    },
    {
        url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-01-03 12:10:00'
    },
    {
        url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-01-01 16:17:00'
    },
    {
        url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2017-12-02 05:24:00'
    }
  ]);

  return (
    <VideoList list={list} />
  );
}