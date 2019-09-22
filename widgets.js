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
import appicon_score from './appicon/score.png';
import appicon_course_survey from './appicon/course_survey.png';
import {PKUHELPER_ROOT} from './const';
import {get_json} from './functions';

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

const FALLBACK_APPS=[
    // id, text, url, icon_normal, icon_hover, new_tab
    ['hole','树洞','/hole',appicon_hole,null,false],
    ['imasugu','教室','/spare_classroom',appicon_imasugu,appicon_imasugu_rev,false],
    ['syllabus','课表','/syllabus',appicon_syllabus,null,false],
    ['score','成绩','/my_score',appicon_score,null,false],
    ['course_survey','测评','http://courses.pinzhixiaoyuan.com/',appicon_course_survey,appicon_course_survey,true],
];
const SWITCHER_DATA_VER='switcher_1';
const SWITCHER_DATA_URL=PKUHELPER_ROOT+'web_static/appswitcher_items.json';

export class AppSwitcher extends Component {
    constructor(props) {
        super(props);
        this.state={
            apps: this.get_apps_from_localstorage(),
        }
    }

    get_apps_from_localstorage() {
        let ret=FALLBACK_APPS;
        if(localStorage['APPSWITCHER_ITEMS'])
            try {
                let content=JSON.parse(localStorage['APPSWITCHER_ITEMS'])[SWITCHER_DATA_VER];
                if(!content || !content.length)
                    throw new Error('content is empty');

                ret=content;
            } catch(e) {
                console.error('load appswitcher items from localstorage failed');
                console.trace(e);
            }

        return ret;
    }

    componentDidMount() {
        setTimeout(()=>{
            fetch(SWITCHER_DATA_URL)
                .then((res)=>{
                    if(!res.ok) throw Error(`网络错误 ${res.status} ${res.statusText}`);
                    return res.text();
                })
                .then((txt)=>{
                    if(txt!==localStorage['APPSWITCHER_ITEMS']) {
                        console.log('loaded new appswitcher items',txt);
                        localStorage['APPSWITCHER_ITEMS']=txt;

                        this.setState({
                            apps: this.get_apps_from_localstorage(),
                        });
                    } else {
                        console.log('appswitcher items unchanged');
                    }
                })
                .catch((e)=>{
                    console.error('loading appswitcher items failed');
                    console.trace(e);
                });
        },500);
    }

    render() {
        let cur_id=this.props.appid;
        return (
            <div className="app-switcher">
                <span className="app-switcher-desc app-switcher-left">
                    <a href="/">PKUHelper</a>
                </span>
                {this.state.apps.map(([id,title,url,icon_normal,icon_hover,new_tab])=>(
                    <a key={id} className={'app-switcher-item'+(id===cur_id ? ' app-switcher-item-current' : '')} href={url} target={new_tab ? '_blank' : '_self'}>
                        {!!icon_normal && [
                            <img key="normal" src={icon_normal} className="app-switcher-logo-normal" />,
                            <img key="hover" src={icon_hover||icon_normal} className="app-switcher-logo-hover" />
                        ]}
                        <span>{title}</span>
                    </a>
                ))}
                <span className="app-switcher-desc  app-switcher-right">
                    网页版
                </span>
            </div>
        );
    }
}