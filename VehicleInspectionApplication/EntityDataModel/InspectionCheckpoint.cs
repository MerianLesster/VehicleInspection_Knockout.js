//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace VehicleInspectionApplication.EntityDataModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class InspectionCheckpoint
    {
        public int CheckpId { get; set; }
        public int InspecId { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
    
        public virtual Checkpoint Checkpoint { get; set; }
        public virtual Inspection Inspection { get; set; }
    }
}
