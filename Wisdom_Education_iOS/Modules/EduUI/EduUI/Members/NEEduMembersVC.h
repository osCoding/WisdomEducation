//
//  NEEduMembersVC.h
//  EduLogic
//
//  Created by Groot on 2021/5/27.
//

#import <UIKit/UIKit.h>
#import "NEEduMember.h"

NS_ASSUME_NONNULL_BEGIN

@interface NEEduMembersVC : UIViewController
@property (nonatomic, assign) BOOL muteChat;
@property (nonatomic, strong) NSMutableArray<NEEduMember *> *members;
- (void)user:(NSString *)userID online:(BOOL)online;
- (void)memberIn:(NEEduMember *)member;
- (void)memberOut:(NSString *)userID;
// 仅刷新列表
- (void)reloadData;
//重新获取上台用户列表，布局UI
- (void)loadData;
@end

NS_ASSUME_NONNULL_END
