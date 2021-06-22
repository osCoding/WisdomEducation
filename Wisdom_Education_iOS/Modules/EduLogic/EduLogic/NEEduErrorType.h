//
//  NEEduErrorType.h
//  Pods
//
//  Created by Groot on 2021/5/26.
//

#ifndef NEEduErrorType_h
#define NEEduErrorType_h

static NSString *NEEduErrorDomain = @"netease.edukit.error";

typedef NS_ENUM(NSInteger, NEEduErrorType) {
    // No error.
    EduErrorTypeNone                        = 0,
    
    // An operation is valid, but currently unsupported.
    NEEduErrorTypeUnsupportOperation,

    // General error indicating that a supplied parameter is invalid.
    NEEduErrorTypeInvalidParemeter,
    //视频开关
    NEEduErrorTypeVideoOnOff,
    //音频开关
    NEEduErrorTypeAudioOnOff,
};

#endif /* NEEduErrorType_h */