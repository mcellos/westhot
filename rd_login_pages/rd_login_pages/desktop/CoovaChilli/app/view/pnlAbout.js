Ext.define('CoovaChilli.view.pnlAbout', {
    extend      : 'Ext.panel.Panel',
    alias       : 'widget.pnlAbout',
    layout      : 'fit',
    initComponent: function() {
        var me = this;// menu = me.menu;

        var scaler_url  = '/cake2/rd_cake/webroot/files/image.php';
        var tpl = Ext.create('Ext.XTemplate', [
                "<div class='divAbout'>"+
                "<div class='imgAbout'><img src='"+scaler_url+"?height=80&image={icon_file_name}' /></div>\n"+
                "<div class='lblAbout'>Name</div>\n"+
                "<div class='lblInfo'>: {name}</div>"+
                "<div class='lblAbout'>Phone</div>\n"+
                "<div class='lblInfo'>: {phone}</div>"+
                "<div class='lblAbout'>Fax</div>\n"+
                "<div class='lblInfo'>: {fax}</div>"+
                "<div class='lblAbout'>Cell</div>\n"+
                "<div class='lblInfo'>: {cell}</div>"+
                "<div class='lblAbout'>email</div>\n"+
                "<div class='lblInfo'>: <a href='mailto:{email}'>{email}</a></div>\n"+
                "<div class='lblAbout'>URL</div>\n"+
                "<div class='lblInfo'>: <a href='{url}' target='_blank'>{url}</a></div>\n"+
                "<div class='lblAbout'>Street</div>\n"+
                "<div class='lblInfo'>: {street_no} {street}</div>\n"+
                "<div class='lblAbout'>Suburb</div>\n"+
                "<div class='lblInfo'>: {town_suburb}</div>\n"+
                "<div class='lblAbout'>City</div>\n"+
                "<div class='lblInfo'>: {city}</div>\n"+
                "<div class='lblAbout'>Lon</div>\n"+
                "<div class='lblInfo'>: {lon}</div>\n"+
                "<div class='lblAbout'>Lat</div>\n"+
                "<div class='lblInfo'>: {lat}</div>\n"+
                "</div>"
            ]);
        me.tpl = tpl;
        me.callParent();
    }
}); 

