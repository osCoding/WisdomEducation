/*
 * @Author: lizhoaxuan
 * @Date: 2021-05-13 10:45:41
 * @LastEditTime: 2021-06-17 11:10:02
 * @LastEditors: Please set LastEditors
 * @Description: IM
 * @FilePath: /app_wisdom_education_web/src/lib/im/index.ts
 */

import NIM from './sdk/NIM_Web_SDK_v8.2.5.js';
import { EnhancedEventEmitter } from '../event';
import logger from '../logger';

interface loginOptions {
  imAppkey: string;
  imAccid: string;
  imToken: string;
  NIMconf?: any;
}

export class NENim extends EnhancedEventEmitter {

  private _nim: any = null;
  private repeatTimes = 0;

  constructor() {
    super();
  }

  /**
   * @description: 抛出IM的实例化后的对象
   * @param {*}
   * @return {*}
   */
  get nim(): any {
    return this._nim;
  }

  /**
   * @description: 登录im并获取实例
   * @param {loginOptions} options
   * @return {*}
   */
  public async loginImServer(options: loginOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      // TODO 离开后销毁IM实例
      if (this._nim) {
        resolve(null)
      }
      this._nim = NIM.NIM.getInstance({
        debug: false,
        db: false,
        appKey: options.imAppkey,
        account: options.imAccid,
        token: options.imToken,
        // 关闭IM中无用的信息同步
        syncRelations: false,
        syncFriends: false,
        syncFriendUsers: false,
        syncTeams: false,
        syncSuperTeams: false,
        syncRoamingMsgs: false,
        syncSuperTeamRoamingMsgs: false,
        // privateConf: this.mapMeetingInfo.get('NIMconf') || {},
        ...options.NIMconf,
        onconnect: () => {
          logger.debug('im连接认证成功...');
          this.emit('im-connect')
        },
        onsyncdone: () => {
          logger.debug('im登录成功...')
          this.repeatTimes = 0;
          resolve(null)
        },
        ondisconnect: (error: any) => {
          logger.error('IM断开连接：', error);
          if (this.repeatTimes <= 5) {
            setTimeout(() => {
              this.repeatTimes += 1;
              logger.error(`IM断开, 尝试重连第${this.repeatTimes}次`);
              this.connect();
            }, 5000);
          }
          // if (this.nim) {
          //   reporter.send({
          //     'action_name': 'login_im_failed',
          //     value: -1
          //   })
          // }
          reject(error)
        },
        onProxyMsg: this.onNotify.bind(this)
      })
    })
  }
  /**
   * @description: 消息通知
   * @param {any} data
   * @return {*}
   */
  private onNotify(data: any): void{
    logger.debug('收到服务器通知', data)
    if (data && data.body) {
      data.body = JSON.parse(data.body)
    }
    this.emit('controlNotify', data)
  }

  /**
   * @description: 透传请求
   * @param {string} path
   * @param {any} body
   * @return {*}
   */
  public async sendControlOrder(path: string, body?: any): Promise<any> {
    const header = {};
    return new Promise((resolve, reject) => {
      this._nim.httpRequestProxy({
        header: JSON.stringify(header),
        path,
        body: JSON.stringify(body),
        done: (e: any, a: any) => {
          logger.log('sendControlOrder, e:, a:  %t', path,  e, a)
          if (e) {
            reject(e)
          } else {
            resolve(JSON.parse(a.body))
          }
        }
      })
    })
  }

  /**
   * @description: 登出IM
   * @param {*}
   * @return {*}
   */
  public logoutImServer(): void {
    if (this._nim) {
      this._nim.disconnect()
      this._nim = null
    }
  }

  /**
   * @description: 登录
   * @param {*}
   * @return {*}
   */
  public connect(): void {
    this._nim && this._nim.connect();
  }
}