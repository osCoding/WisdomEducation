//
//  ENavigationViewController.m
//  NEEducation
//
//  Created by Netease on 2021/1/18.
//

#import "ENavigationViewController.h"

@interface ENavigationViewController ()

@end

@implementation ENavigationViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

#pragma mark - Orientations

- (BOOL)shouldAutorotate {
    return [[self.viewControllers lastObject] shouldAutorotate];
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
     return [[self.viewControllers lastObject] supportedInterfaceOrientations];
}

- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation {
    return [[self.viewControllers lastObject] preferredInterfaceOrientationForPresentation];
}

@end
