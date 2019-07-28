import React, {Component, PureComponent} from 'react';

import TimeAgo from 'react-timeago';
import chineseStrings from 'react-timeago/lib/language-strings/zh-CN';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import './global.css';
import './widgets.css';

import appicon_hole from './appicon/hole.png';
import appicon_imasugu from './appicon/imasugu.png';
import appicon_imasugu_rev from './appicon/imasugu_rev.png';
import appicon_syllabus from './appicon/syllabus.png';
import appicon_syllabus_rev from './appicon/syllabus_rev.png';
import appicon_score from './appicon/score.png';
import appicon_course_survey from './appicon/course_survey.png';

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
    // id, text, url, icon_normal, icon_hover
    ['hole','树洞','/hole',appicon_hole,appicon_hole],
    ['imasugu','教室','/spare_classroom',appicon_imasugu,appicon_imasugu_rev],
    ['syllabus','课表','/syllabus',appicon_syllabus,appicon_syllabus_rev],
    ['score','成绩','/my_score',appicon_score,appicon_score],
    ['course_survey','测评','http://courses.pinzhixiaoyuan.com/',appicon_course_survey,appicon_course_survey],
];
export function AppSwitcher(props) {
    let cur_id=props.appid;
    return (
        <div className="app-switcher">
            <span className="app-switcher-desc app-switcher-left">
                <a href="/">PKUHelper</a>
            </span>
            {APPS.map(([id,title,url,icon_normal,icon_hover])=>(
                <a key={id} className={'app-switcher-item'+(id===cur_id ? ' app-switcher-item-current' : '')} href={url}>
                    <img src={icon_normal} className="app-switcher-logo-normal" />
                    <img src={icon_hover} className="app-switcher-logo-hover" />
                    {title}
                </a>
            ))}
            <span className="app-switcher-desc  app-switcher-right">
                网页版
            </span>
        </div>
    );
}