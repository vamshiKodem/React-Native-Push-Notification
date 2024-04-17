package com.react_native_push_notification.vpnStatusModule

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.util.Log
import androidx.core.content.getSystemService
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = "VpnStatusModule")
class VpnStatusModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "VpnStatusModule"
    }

    @ReactMethod
    fun isVpnConnected(promise: Promise) {
        val connectivityManager = this.reactApplicationContext.applicationContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val activityManager = connectivityManager.activeNetwork
        val networkCapabilities = connectivityManager.getNetworkCapabilities(activityManager);
        var isRunningVpn = false
        if(networkCapabilities != null && (networkCapabilities.hasTransport(NetworkCapabilities.TRANSPORT_VPN) || !networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_NOT_VPN))){
            isRunningVpn = true
        }
        promise.resolve(isRunningVpn)

    }
}