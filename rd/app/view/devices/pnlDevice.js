Ext.define('Rd.view.devices.pnlDevice', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.pnlDevice',
    border: false,
    d_id: null,
    d_name: null,
    cmbOwnerRendered: false,
    plain   : true,
    record: undefined, //The record of the device which we edit
    initComponent: function(){
        var me      = this;
        //Set default values for from and to:
        var dtFrom  = new Date();
        var dtTo    = new Date();
        dtTo.setYear(dtTo.getFullYear() + 1);

        me.items = [
        {   
            title:  i18n('sBasic_info'),
            itemId : 'tabBasicInfo',
            layout: 'hbox',
            items:  { 
                xtype   :  'form',
                height  : '100%', 
                width   :  500,
                layout  : 'anchor',
                autoScroll:true,
                frame   : true,
                defaults    : {
                    anchor: '100%'
                },
                fieldDefaults: {
                    msgTarget: 'under',
                    labelClsExtra: 'lblRd',
                    labelAlign: 'left',
                    labelSeparator: '',
                    margin: 15
                },
                items       : [
                    {
                        xtype       : 'textfield',
                        fieldLabel  : i18n('sDescription'),
                        name        : "description",
                        allowBlank  : false,
                        blankText   : i18n('sSupply_a_value'),
                        labelClsExtra: 'lblRdReq'
                    },
                    {
                        xtype       : 'cmbPermanentUser',
                        allowBlank  : false,
						name		: 'permanent_user_id',
                        labelClsExtra: 'lblRdReq',
                        itemId      : 'owner'
                    },             
                    {
                        xtype       : 'cmbProfile',
                        allowBlank  : false,
                        labelClsExtra: 'lblRdReq',
                        itemId      : 'profile'
                    },
                    {
                        xtype       : 'cmbCap',
                        allowBlank  : false,
                        labelClsExtra: 'lblRdReq',
                        itemId      : 'cap',
                        hidden      : true,
                        value       : 'hard',
                        fieldLabel  : i18n('sCap_type_for_data'),
                        itemId      : 'cmbDataCap',
                        name        : 'cap_data'
                    },
                    {
                        xtype       : 'cmbCap',
                        allowBlank  : false,
                        labelClsExtra: 'lblRdReq',
                        itemId      : 'cap',
                        hidden      : true,
                        value       : 'hard',
                        fieldLabel  : i18n('sCap_type_for_time'),
                        itemId      : 'cmbTimeCap',
                        name        : 'cap_time'
                    },
                    {
                        xtype       : 'checkbox',      
                        boxLabel    : i18n('sAlways_active'),
                        name        : 'always_active',
                        inputValue  : 'always_active',
                        itemId      : 'always_active',
                        checked     : true,
                        boxLabelCls : 'lblRdCheck'
                    },
                    {
                        xtype       : 'datefield',
                        fieldLabel  : i18n('sFrom'),
                        name        : 'from_date',
                        itemId      : 'from_date',
                        minValue    : new Date("May 20, 2013 00:00:00"), 
                        hidden      : true,
                        disabled    : true,
                        value       : dtFrom
                    },
                    {
                        xtype       : 'datefield',
                        fieldLabel  : i18n('sTo'),
                        name        : 'to_date',
                        itemId      : 'to_date',
                        minValue    : new Date("May 21, 2013 00:00:00"),
                        hidden      : true,
                        disabled    : true,
                        value       : dtTo
                    }
                ],
                buttons: [
                    {
                        itemId: 'save',
                        text: i18n('sSave'),
                        scale: 'large',
                        iconCls: 'b-save',
                        glyph: Rd.config.icnYes,
                        plain   : true,
                        margin: '0 20 40 0'
                    }
                ]
            }  
        },
        { 
            title   : i18n('sPrivate_attributes'),
            layout  : 'fit',
            xtype   : 'gridDevicePrivate',  
            username: me.d_name
        },
        { 
            title   : i18n('sTracking'),
            itemId: 'tabTracking',
            layout: 'hbox',
            items:  { 
                xtype   :  'form',
                height  : '100%', 
                width   :  400,
                autoScroll:true,
                layout  : 'anchor',
                frame   : true,
                defaults    : {
                    anchor: '100%'
                },
                fieldDefaults: {
                    msgTarget: 'under',
                    labelClsExtra: 'lblRd',
                    labelAlign: 'left',
                    labelSeparator: '',
                    margin: 15
                },
                items       : [
                    {
                        xtype       : 'checkbox',      
                        boxLabel    : i18n('sRADIUS_authentication'),
                        name        : 'track_auth',
                        inputValue  : 'track_auth',
                        checked     : true,
                        boxLabelCls : 'lblRdCheck'
                    },
                    {
                        xtype       : 'checkbox',      
                        boxLabel    : i18n('sRADIUS_accounting'),
                        name        : 'track_acct',
                        inputValue  : 'track_acct',
                        checked     : true,
                        boxLabelCls : 'lblRdCheck'
                    }                
                ],
                buttons: [
                    {
                        itemId: 'save',
                        text: i18n('sSave'),
                        scale: 'large',
                        iconCls: 'b-save',
                        glyph: Rd.config.icnYes,
                        margin: '0 20 40 0'
                    }
                ]
            }
        },
        { 
            title   : i18n('sAuthentication_data'),
            layout  : 'fit',
            xtype   : 'gridDeviceRadpostauths',  
            username: me.d_name
        },
        { 
            title   : i18n('sAccounting_data'), 
            layout  : 'fit',
            xtype   : 'gridDeviceRadaccts',
            username: me.d_name
        },
        { 
            title   : i18n('sUsage_graphs'), 
            layout  : 'fit',
            xtype   : 'tabpanel',
            itemId  : 'pnlUsageGraphs',
            margins : '0 0 0 0',
            plain   : true,
            border  : true,
            tabPosition: 'bottom',
            items   :   [
                {
                    title   : i18n('sDaily'),
                    itemId  : "daily",
                    xtype   : 'pnlUsageGraph',
                    span    : 'daily',
                    layout  : 'fit',
                    username: me.d_name,
                    type    : 'device'
                },
                {
                    title   : i18n('sWeekly'),
                    itemId  : "weekly",
                    xtype   : 'pnlUsageGraph',
                    span    : 'weekly',
                    layout  : 'fit',
                    username: me.d_name,
                    type    : 'device'
                },
                {
                    title   : i18n('sMonthly'),
                    itemId  : "monthly",
                    layout  : 'fit',
                    xtype   : 'pnlUsageGraph',
                    span    : 'monthly',
                    username: me.d_name,
                    type    : 'device'
                }
            ]
        }      
    ]; 
        me.callParent(arguments);
    }
});
