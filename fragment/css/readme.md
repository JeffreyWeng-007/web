## sass与scss
   区别：
      sass不需要使用中括号
      scss比较规范
    
   易忘点   
   *  &表示父类继承(其实代表的就是父类)
   `
    .cls {
        color: red;
        &.clss {
            //拥有color：red
        }
        .csl & {
            //反嵌套父类,即.csl .cls{}
        }
    }
    `

   * 子选择器
      '>'为'直接'子元素   `<h1><strong></strong></h1>`
      '+'为同层相邻元素，紧跟在后面的'第一个' `<h1></h1><strong></strong>`
      '~'为同层全体'后'，不管隔几个`<h1></h1><st></st><st></str>...`
   
   * last-clild
     .cls:last-child为最后一个cls元素
        
   * 属性选择器
      [class~='icui'] class包含**独立单词**icui
      [class*='icui'] 包含该单词即可
    
    
    
    