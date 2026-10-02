# Prism Daily Health Check & Restart Reminder
$uptime = (Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
$uptimeDays = [math]::Round($uptime.TotalDays, 1)

# Only remind if PC has been running for 24+ hours
if ($uptime.TotalHours -ge 24) {
    Add-Type -AssemblyName PresentationFramework
    $msg = "Hey Tyler!`n`nYour Alienware m18 has been on for $uptimeDays days without a reboot.`n`nTo prevent the 0.70 GHz CPU throttle lock, clear RAM leaks, and keep games buttery smooth, give your PC a quick restart today!"
    [System.Windows.MessageBox]::Show($msg, "Alienware Daily Health Reminder - Prism", [System.Windows.MessageBoxButton]::OK, [System.Windows.MessageBoxImage]::Information)
}
