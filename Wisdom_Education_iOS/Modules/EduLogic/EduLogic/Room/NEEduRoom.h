//
//  NEEduRoom.h
//  EduLogic
//
//  Created by Groot on 2021/5/17.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, NEEduSceneType) {
    NEEduSceneType1V1 = 0,
    NEEduSceneTypeSmall = 1,
    NEEduSceneTypeBig = 2,
};

@interface NEEduRoom : NSObject

/// 班级名称
@property (nonatomic, strong) NSString *roomName;
/// 班级Id
@property (nonatomic, strong) NSString *roomUuid;
/// 班级类型
@property (nonatomic, assign) NEEduSceneType sceneType;
@property (nonatomic, assign) NSInteger configId;

@end

NS_ASSUME_NONNULL_END