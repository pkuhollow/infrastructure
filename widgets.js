import React, {Component, PureComponent} from 'react';

import TimeAgo from 'react-timeago';
import chineseStrings from 'react-timeago/lib/language-strings/zh-CN';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import './global.css';
import './widgets.css';

function pad2(x) {
    return x<10 ? '0'+x : ''+x;
}
export function format_time(time) {
    return `${time.getMonth()+1}-${pad2(time.getDate())} ${time.getHours()}:${pad2(time.getMinutes())}:${pad2(time.getSeconds())}`;
}
const chinese_format=buildFormatter(chineseStrings);
export function Time(props) {
    const time=new Date(props.stamp*1000);
    return (
        <span>
            <TimeAgo date={time} formatter={chinese_format} />
            &nbsp;
            {format_time(time)}
        </span>
    );
}

export function TitleLine(props) {
    return (
        <p className="centered-line title-line aux-margin">
            <span className="black-outline">{props.text}</span>
        </p>
    )
}

export function GlobalTitle(props) {
    return (
        <div className="aux-margin">
            <div className="title">
                <p className="centered-line">{props.text}</p>
            </div>
        </div>
    );
}

const APPS=[
    ['hole','树洞','/hole'],
    ['imasugu','教室','/spare_classroom'],
    ['syllabus','课表','/syllabus'],
    ['score','成绩','/my_score'],
];
export function AppSwitcher(props) {
    let cur_id=props.appid;
    return (
        <div className="app-switcher">
            <span className="app-switcher-desc app-switcher-left">
                <a href="/">PKUHelper</a>
            </span>
            {APPS.map(([id,title,url])=>(
                <a key={id} className={'app-switcher-item'+(id===cur_id ? ' app-switcher-item-current' : '')} href={url}>
                    {title}
                </a>
            ))}
            <span className="app-switcher-desc  app-switcher-right">
                网页版
            </span>
        </div>
    );
}