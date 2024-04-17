package com.react_native_push_notification.vpnStatusModule

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class VpnStatusModulePackage : ReactPackage {
    override fun createViewManagers(
            reactContext: ReactApplicationContext
    ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()

    override fun createNativeModules(
            reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(VpnStatusModule(reactContext)).toMutableList()
}