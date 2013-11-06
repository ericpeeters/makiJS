/**
    @object     =Emmet
    @desc       An object of Emmet arrays with test cases
**/


var Emmet = {
    headers: [
    'h1>{Header level 1}',
        'h2>{Header level 2}',
        'h2>a[href="/"].link>{Header level 2 - link}',
        'h2.divider{Header level 2 - divider}',
        'h3>{Header level 3}',
        'h3>a[href="/"].link>{Header level 3 - link}',
        'h3.divider{Header level 3 - divider}'
    ],
    buttons: [        
        'a[href="/"].link.contentText{Individual hyperlink}',
        'a[href="/"].link.more.contentText{Lees verder &gt;}',
        'button.btn{button}',
        'a[href="/"].btn{button (anchor)}',
        'button.btn.btnCta{CTA button}',
        'a[href="/"].btn.btnCta{CTA button (anchor)}',
        'button.btn.btnBig{Big button}',
        'a[href="/"].btn.btnBig{Big button (anchor)}',
        'button.btn.btnOpposite{button right}',
        'a[href="/"].btn.btnOpposite{button right (anchor)}',
        'button.btn.btnFullWidth{button fullwidth}',
        'a[href="/"].btn.btnFullWidth{button fullwidth (anchor)}',
        'button.btn.btnCentered{button centered}',
        'a[href="/"].btn.btnCentered{button centered (anchor)}'
    ],
    content: [
            'div.contentText > (div.introText>p{[introtext level 3]}+p*2>lorem)+(p*2>lorem)+ul>li*5>lorem',
        'div.contentCols.clearfix>.contentCol*2>{[col]}',
        'div.contentCols.contentCols2.clearfix>.contentCol*2>{[col]}',
        'div.contentCols.contentCols3.clearfix>.contentCol*3>{[col]}',
        'div.contentCols.contentCols4.clearfix>.contentCol*4>{[col]}',
        'div.contentBox>p>lorem',
        'div.contentBox.clearfix.contentBoxBorder>p>lorem',
        'div.contentBox.clearfix.contentBoxContrast>p>lorem',
        'div.contentBox.clearfix.contentBoxContrast>p>lorem',
        'div.contentBox.clearfix>a.btn>{Wil u deze aanbieding zien?}',
        'div.contentBox.clearfix>p>a.btn.btnCta{btnCta}',
        'div.contentBox.clearfix>p>{lorem}+ul>li*4>{Item-$}',
        'div.contentBox.clearfix>p>{lorem}+ul>li*4>{Item Bla}',
        'div.contentBox.clearfix>button.btn>{Button}',
        'div.contentBox.clearfix>h5>{Header 5}',
        'div.contentBox.clearfix>lorem'
    ],
    text: [
        'div.introText >p{[introtext level 1]}^+p>lorem',
        'div.contentText.introText>p{[introtext level 2]}^ +p*2>lorem',
        'div.noteText>p>lorem',
        'div.centeredText>p>lorem'
    ]
};
