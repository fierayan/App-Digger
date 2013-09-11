#接口规范

	{
		userName: xxxxx,                            // 信息提交者name,同公司ID
		submitTime: 2013-08-27T09:48:02.130Z,     // 提交时间，格式为ISO 8601格式  
        appName: xxxxxx,                          // app名称  
		appIconSrc: xxxxxx,                       // app所用icon的图片地址  
		screenShotSrc: [                          // app预览截图地址
				{shot-1:xxxxxx},
				{shot-2:xxxxxx},
				{shot-3:xxxxxx},
				{shot-4:xxxxxx}
		],
		appDes:xxxxxxxxxxxxxx,                    // app功能描述  
		promoteReason:xxxxxxxxxxxx,               // 推荐理由  
		appLink:xxxxxxxxxxx,		              // app下载地址，后台生成二维码  
		appCategory:xxx                           // app所属分类 
	}